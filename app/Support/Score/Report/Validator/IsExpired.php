<?php

namespace App\Support\Score\Report\Validator;

use App\Support\Score\Exceptions\Report\ReportHasExpiredException;
use App\Support\Score\Report\Validator\Contracts\AbstractReportValidator;

class IsExpired extends AbstractReportValidator {

    public function validate($score)
    {
        if($score->isExpired()) {
            throw new ReportHasExpiredException;
        }

        return parent::validate($score);
    }

}
