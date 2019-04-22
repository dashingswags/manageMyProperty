<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;

use Auth;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{

    function signup(Request $request){

    	if($request->isMethod('post')){

	    	$validator = $this->validateNewUser($request);
        
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

	    	$user = $this->saveNewuserDetails($request,$user_role = 2);

        $token = JWTAuth::fromUser($user); 
	    	//return (new UserResource($user))->response()->setStatusCode(201);
  			return $this->successfulResponse([
  				'message' => 'Registration Successful.',
  				'payload'	  => new UserResource($user),
          'token' => $token
  			], 201);
    	}

    }

  	function registerManager(Request $request){

        $validator = $this->validateNewUser($request);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

    		$user = $this->saveNewuserDetails($request, $user_role = 2);

    		return $this->successfulResponse([
    			'message' => 'Manager Added Successfuly.',
    			'payload'	  => new UserResource($user)
    		], 201);
  	}

    function login(Request $request){

    	  $validator = Validator::make($request->all(), [
           'email' =>'required',
           'password' =>'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $credentials = $request->only('email', 'password');
        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could not create token'], 500);
        }
        //return response()->json(compact('token'));
        return $this->successfulResponse([
          'message' => 'Manager Added Successfuly.',
          'payload'   => new UserResource(Auth::user()),
          'token' => $token,
        ], 201);
        
    }

    public function getAuthenticatedUser(){

        try {

          if (! $user = JWTAuth::parseToken()->authenticate()) {
            return response()->json(['user_not_found'], 404);
          }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

          return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

          return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

          return response()->json(['token_absent'], $e->getStatusCode());

        }

        // the token is valid and we have found the user via the sub claim
        return response()->json(compact('user'));
    }

    function validateNewUser($request){

        return Validator::make($request->all(),[
           'name' =>'required|max:255',
           'email'=> ['required','email','unique:users'],
           'password'=> 'required|min:8',
           'confirm_password'=> 'required|min:8|same:password'
        ]);

    }

    function saveNewuserDetails($request, $user_role){

      	$user = new User();
      	$user->name = $request->name;
      	$user->email = $request->email;
      	$user->user_role = $user_role; //1 = tenant, 2 = manager
      	$user->password = bcrypt($request->password);
      	$user->reftag = self::hashFunction();
      	$user->save();

      	return $user;
        
    }




}
