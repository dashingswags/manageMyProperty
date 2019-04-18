<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Property;
use App\Http\Resources\PropertyResource;

class PropertyController extends Controller
{
    function index(){
    	//property dashboards
    	return PropertyResource::collection(Property::all());
    }

    function viewProperty($id){
    	$property = Property::findOrFail($id);
    	return new PropertyResource($property);
    }

    function setupProperty(Request $request){
    	//to add and update property details
    	$request->validate([
            'title' => 'required|max:255',
            'description' => 'required'
        ]);

        $property = new Property();
        $property->title = $request->title;
        $property->description = $request->description;
        $property->status = $request->status;
        $property->reftag = self::hashFunction();
        $property->save();

        return (new PropertyResource($property))->response()->setStatusCode(201);

    }

    function viewPropertyBids(){
    	//view all bids by prospective tenants
    }

    function setBidStatus(){
    	//approve or decline a bid
    }

    function manageRentedProperties(){
    	//check their rent status and other required information
    }
}
