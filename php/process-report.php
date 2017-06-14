<?php
/**
 * Created by PhpStorm.
 * User: Darrell
 * Date: 06/14/2017
 * Time: 6:33 PM
 */

class error_reporter {
    public $error_id;
    public function getErrorId() {
        $this->error_id = $_POST['error_id'];
        return $this->error_id;
    }
}