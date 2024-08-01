<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShowExamResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'title' => $this->title,
            'date' => $this->date,
            'is_report_expired' => ! $this->isReportTimeValid(),
            'report_start_time' => $this->report_start_time,
            'report_end_time' => $this->report_end_time,
            'course' => new ExamDataResource($this->course),
        ];

        return !auth('student')->check() ? $data += ['scores' => new ScoreCollection($this->scores)] : $data += ['scores' => new ScoreResource($this->score)];
    }
}
