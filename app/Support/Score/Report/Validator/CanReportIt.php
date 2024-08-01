<?php

namespace App\Support\Score\Report\Validator;

use App\Support\Score\Exceptions\Report\IllegalReportException;
use App\Support\Score\Report\Validator\Contracts\AbstractReportValidator;

class CanReportIt extends AbstractReportValidator {

    public function validate($score)
    {
        if(!auth()->user()->scores->contains($score)) {
            throw new IllegalReportException;
        }

        return parent::validate($score);
    }

}
