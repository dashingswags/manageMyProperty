<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class PropertiesSeederTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create('App\Property');
        for($i = 1 ; $i <= 10 ; $i++){

	        DB::table('properties')->insert([
	        	'title' => $faker->sentence(),
	        	'description' => $faker->sentence(),
	        	'status' => 0,
	        	'created_by' => 1,
	        	'created_at' => \Carbon\Carbon::now(),
	        	'Updated_at' => \Carbon\Carbon::now(),
	        	'reftag' => $this->hashFunction()
	        ]);

        }

    }

    public static function hashFunction($strlnt = null){
        
        $length = is_null($strlnt)? 20 : $strlnt;
        $hash = substr(md5(uniqid(mt_rand(),true)),0,$length);
        return $hash;
    }
}
