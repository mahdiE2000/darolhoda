<?php

namespace App\Support\Score\Report\Validator\Contracts;

abstract class AbstractReportValidator implements ReportValidatorInterface {

    private $nextValidator;
    public function setNextValidator(ReportValidatorInterface $validator)
    {
        $this->nextValidator = $validator;
    }
    public function validate($score)
    {

        if($this->nextValidator === null) {
            return true;
        }

        return $this->nextValidator->validate($score);
    }
}
