<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropertyBidsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('property_bids', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('property_id');
            $table->integer('tenant_id');
            $table->timestamp('issue_date')->nullable();
            $table->timestamp('expiry_date')->nullable();
            $table->boolean('status')->default(0); //pending approved or declined
            $table->timestamps();
            $table->char('reftag',60);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('property_bids');
    }
}
