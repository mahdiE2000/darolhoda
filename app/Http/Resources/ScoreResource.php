<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScoreResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'score' => $this->score,
            'course_selected_id' => $this->course_selected_id,
            'ask' => $this->ask,
            'answer' => $this->answer,
            'files' => new FileCollection($this->files),
        ];
    }
}
