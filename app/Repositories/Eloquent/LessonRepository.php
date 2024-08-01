<?php

namespace App\Repositories\Eloquent;
use App\Repositories\LessonRepositoryInterface;
use App\Models\Lesson;

class LessonRepository implements LessonRepositoryInterface {

    public function getAll()
    {
		return Lesson::orderBy('created_at', 'desc')->get();
    }

    public function getPaginated($count)
    {
        return Lesson::orderBy('created_at', 'desc')->paginate($count)->withQueryString(['itemsPerPage' => $count]);
    }

    public function search($search)
    {
        return Lesson::where("title", "like", "%" . $search . "%")->get();
    }

    public function getLesson($id)
    {
        return Lesson::findOrFail($id);
    }

    public function create($data)
    {
        return Lesson::create($data);
    }

    public function update($id, $data)
    {
        return Lesson::find($id)->update($data);
    }

}
