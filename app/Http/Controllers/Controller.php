<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public static function hashFunction($strlnt = null){
        
        $length = is_null($strlnt)? 20 : $strlnt;
        $hash = substr(md5(uniqid(mt_rand(),true)),0,$length);
        return $hash;
    }

    public function errorResponse($message = "", $status = "400"){

		$payload = [
			'status'	=> 'error',
		];

		// If $message is an array we assume it is the array payload to
		// be retured with the response.
		if(is_array($message)){
			$payload = $payload+$message;
		}

		// Else we assume it is just the message to be returned to be
		// returned with the response.
		else{
			$payload['message'] = $message;
		}

		return new JsonResponse($payload, $status);
	}

	public function successfulResponse($message = "", $status = "200"){

		$payload = [
			'status'	=> 'success',
		];

		// If $message is an array we assume it is the array payload to
		// be retured with the response.
		if(is_array($message)){
			$payload = $payload+$message;
		}

		// Else we assume it is just the message to be returned to be
		// returned with the response.
		else{
			$payload['message'] = $message;
		}

		return new JsonResponse($payload, $status);
	}

	public function exceptionResponse($exception){

		return new JsonResponse($exception->getPayload(), $exception->getStatusCode());
	}

}
