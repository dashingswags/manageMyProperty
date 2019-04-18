<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Auth;

class AuthController extends Controller
{
    function index() {
    	//to display register or view page
    }

    function signup(Request $request){

    	if($request->isMethod('post')){
	    	$this->validateNewUser($request);
	    	$user = $this->saveNewuserDetails($request,$user_role = 2);
	    	//return (new UserResource($user))->response()->setStatusCode(201);
			return $this->successfulResponse([
				'message' => 'Registration Successful.',
				'data'	  => new UserResource($user)
			], 201);
    	}
		return $this->successfulResponse([
			'message' => 'test data.',
			'data'	  => []
		], 201);

    }

  	function registerManager(Request $request){

  		$this->validateNewUser($request);
  		$user = $this->saveNewuserDetails($request, $user_role = 2);
		return $this->successfulResponse([
			'message' => 'Manager Added Successfuly.',
			'data'	  => new UserResource($user)
		], 201);
  	}

    function login(Request $request){

    	$this->validate($request, [
           'email' =>'required',
           'password' =>'required'
        ]);

        $remember_me = ($request->remember_me)? true : false;
		if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $remember_me) || Auth::viaRemember()) {

			$user = Auth::user();
			return $this->successfulResponse([
				'message' => 'Login Successful.',
				'data'	  => new UserResource($user)
			], 201);

        }
        return $this->errorResponse('The given credentials failed authentication.');
    }

    function validateNewUser($request){

        $this->validate($request,[
           'name' =>'required|max:255',
           'email'=> ['required','email','unique:users'],
           'password'=> 'required|min:8',
           'password_confirmation'=> 'required|min:8|same:password'
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
