
var AUTHENTICATION_MESSAGE = 'Request did not have an authenticated user attached with it';

var addTenant = function(request) {
  return new Promise((resolve, reject) => {
    addUser(request).then((user)=>{

      console.log("user created");

      var Tenant = Parse.Object.extend("Tenant");
      var tenant = new Tenant();

      tenant.set("user", user);
      tenant.set("companyName", request.params.companyName);
      tenant.set("status", request.params.companyStatus? 'active' : 'unverified');
      tenant.save(null, { useMasterKey: true }).then(
        function(tenant) {
          updateTenantCompanyLogoPic(tenant, request).then((tenant)=>{
            // generateRolesAndSetPermissionsNewTenant(user,tenant).then((user,tenant)=>{
            //   resolve(tenant);
            // }).catch((error)=>{
            //   reject(error);
            // })
            resolve(tenant);
          }).catch((error)=>{
            reject(error);
          })
        },
        function(tenant, error) {
          reject(error)
        }
      );
    }).catch((error)=>{
      reject(error);
    });
  });
}

var generateRolesAndSetPermissionsNewTenant = function(user, tenant){
  

  
  var user_acl = new Parse.ACL();
  user_acl.setWriteAccess( user, true);
  user_acl.setRoleWriteAccess( 'super', true);
  user_acl.setPublicReadAccess(true);
  user.setACL(user_acl);

  var tenant_acl = new Parse.ACL();
  tenant_acl.setWriteAccess( user, true);
  tenant_acl.setRoleWriteAccess( 'super', true);
  tenant_acl.setPublicReadAccess(true);
  tenant.setACL(user_acl);


}

var createRole = function(user, type, acl){
  return new Promise((resolve, reject) => {
    var role_acl = new Parse.ACL();
    role_acl.setWriteAccess( user, true);
    role_acl.setRoleWriteAccess( 'super', true);
    var role = new Parse.Role(user.id+'_'+type, role_acl);
    role.save(null, { useMasterKey: true }).then(
      function(role) {
        role.getRoles().add('super');
        role.getUsers().add(user);
        role.save(null, { useMasterKey: true }).then(
          function(role) {
            resolve(role);
          },
          function(error) {
            reject(error);
          }
        );
        
      },
      function(error) {
        reject(error);
      }
    );
  });

}

var updateTenantCompanyLogoPic = function(tenant, request){
  return new Promise((resolve, reject) => {
    if(request.params.companyLogoPic.length){
      tenant.set("logo", getParseFile(tenant.id + "_profilePic",{ base64: request.params.profilePic }));
      tenant.save(null, { useMasterKey: true }).then(
        function(tenant) {
          resolve(tenant);
        },
        function(error) {
          reject(error);
        }
      );
    }else{
      reject({message: "ERROR : Image upload failed, data lenght 0."});
    }
  });
}

var setUserProfilePic = function(user, request){
  return new Promise((resolve, reject) => {
    if(request.params.profilePic.length){
      user.set("profilePic", getParseFile(user.id + "_profilePic",{ base64: request.params.profilePic }));
      user.save(null, { useMasterKey: true }).then(
        function(user) {
          resolve(user);
        },
        function(error) {
          reject(error);
        }
      );
    }else{
      reject({message: "ERROR : Image upload failed, data lenght 0."});
    }
  });
}

var addUser = function(request){
  return new Promise((resolve, reject) => {
    var user = new Parse.User();
    user.set("username", request.params.username);
    user.set("password", request.params.password);
    user.set("firstName", request.params.firstName);
    user.set("lastName", request.params.lastName);
    user.set("email", request.params.email);

    user.signUp(null, { useMasterKey: true }).then(function(user) {
        setUserProfilePic(user,request).then((user)=>{
          resolve(user)
        }).catch((error)=>{
          reject(error)
        })
      },function(user, error) {
        reject(error)
      }
    )
  })
}

var getParseFile = function(name, encoding){
  name = name.replace(/[^a-zA-Z0-9_.]/g, '');
  var parseFile = new Parse.File( name, encoding);
  return parseFile;
}

Parse.Cloud.define('addTenant', function(request, response){
  addTenant(request).then((tenant)=>{
      response.success(tenant);
  }).catch((error)=>{
    response.error(error);
  });
});

Parse.Cloud.define('getUserRole', function(request, response){
  
  if(!Parse.User.current()){
    response.error('Request did not have an authenticated user attached with it');
  }

  var userQuery = new Parse.Query(Parse.User);
  userQuery.equalTo("objectId", Parse.User.current().id);
  userQuery.include("role");
  userQuery.find({
    success: function(user)
    {
      if(userRetrieved[0]){
        response.success({role: user.get("role").get("name")});
      }
    },
    error: function(error)
    {
      response.error('Request failed: ' + JSON.stringify(error,null,2));
    }
  });
});

Parse.Cloud.define('hasRole', function(request, response){
  if(!Parse.User.current()){
    response.error('Request did not have an authenticated user attached with it');
  }
  else {
    userHasRole(request.params.parseSessionToken, request.params.role)
      .then(function(hasRole){
        response.success({hasRole: hasRole});
      },
      function(error){
        console.error('Request failed: ' + JSON.stringify(error,null,2));
        response.error('Request failed: ' + JSON.stringify(error,null,2));
      });
  }
});

var userHasRole = function(username, rolename) {
  var queryRole = new Parse.Query(Parse.Role);
  queryRole.equalTo('name', rolename);
  return queryRole.first({useMasterKey:true})
    .then(function(roleObject){
      var queryForUsername = roleObject.relation('users').query();
      queryForUsername.equalTo('username', username)
      return queryForUsername.first({useMasterKey:true})
        .then(function(userObject){
          if(userObject){
            console.log(username + ' has role: ' + rolename);
            return Parse.Promise.as(true);
          }
          else{
            console.log(username + ' does not have role: ' + rolename);
            return Parse.Promise.as(false);
          }
        });
    });
}