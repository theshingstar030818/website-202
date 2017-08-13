
var AUTHENTICATION_MESSAGE = 'Request did not have an authenticated user attached with it';

var addTenant = function(request) {
  return new Promise((resolve, reject) => {
    addUser(request).then((user)=>{
      resolve(user);
    }).catch((error)=>{
      reject(error);
    });
  });
}

var setUserProfilePic = function(user, request){
  return new Promise((resolve, reject) => {
    if(request.params.profilePic.length){
      user.set("profilePic", getParseFile(user.id + "_profilePic",{ base64: request.params.profilePic }));
      user.save(null, {
        success: function(user) {
          resolve(user);
        },
        error: function(error) {
          reject(error);
        }
      });
    }else{
      reject({message: "ERROR : Image upload failed, data lenght 0."});
    }
  });
}

var addUser = function(request){
  return new Promise((resolve, reject) => {
    Parse.Cloud.useMasterKey();
    var user = new Parse.User();
    user.set("username", request.params.username);
    user.set("password", request.params.password);
    user.set("firstName", request.params.firstName);
    user.set("lastName", request.params.lastName);
    user.set("email", request.params.email);

    user.signUp(null, {
      success: function(user) {
        setUserProfilePic(user,request).then((user)=>{
          resolve(user);
        }).catch((error)=>{
          reject(error);
        });
      },
      error: function(user, error) {
        reject(error);
      }
    });
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
  Parse.Cloud.useMasterKey();
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