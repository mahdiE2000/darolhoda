<?php

namespace App\Support\Score\Report\Validator\Contracts;

interface ReportValidatorInterface {
    public function setNextValidator(ReportValidatorInterface $validator);
    public function validate($score);
}
