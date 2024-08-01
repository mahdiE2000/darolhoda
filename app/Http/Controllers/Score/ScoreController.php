<?php

namespace App\Http\Controllers\Score;

use App\Http\Controllers\Controller;
use App\Http\Resources\ShowScoreResource;
use App\Support\Score\Exceptions\CourseSelectedDoesntMatchWithExamException;
use App\Support\Score\Exceptions\ScoreExistsException;
use App\Support\Score\Exceptions\ScoreFileNotFoundException;
use App\Support\Score\Exceptions\ScoreReportAnsweredException;
use App\Support\Score\Exceptions\ScoreReportTimeExpirationException;
use App\Support\Score\Exceptions\ScoreUpdateActionNotDefinedException;
use App\Support\Score\Score;
use App\Http\Requests\ScoreStore;
use App\Http\Requests\ScoreUpdate;

class ScoreController extends Controller
{
    protected $score;

    public function __construct(Score $score)
    {
        $this->score = $score;
    }

    public function store(ScoreStore $request)
    {
        try {

            $this->score->create();

            return response()->json([
                'message' => 'success'
            ]);

        } catch (CourseSelectedDoesntMatchWithExamException $exception) {

            return response()->json(['message' => 'شناسه درس اخذ شده با شناسه امتحان سازگار نیست']);

        } catch (ScoreExistsException $exception) {

            return response()->json(['message' => 'نمره دانش آموز قبلا ثبت شده است']);

        } catch (ScoreFileNotFoundException $exception) {

            return response()->json(['message' => 'فایل آپلود شده نادرست است']);

        }
    }

    public function show(string $id)
    {
        return response()->json(new ShowScoreResource($this->score->getScore($id)));
    }

    public function update(ScoreUpdate $request, string $id)
    {
        try{

            $this->score->update($id);

            return response()->json([
                'message' => 'success'
            ]);

        } catch (ScoreUpdateActionNotDefinedException $exception) {

            return response()->json(['message' => 'لطفا نوع ویرایش را وارد کنید']);

        }  catch (ScoreFileNotFoundException $exception) {

            return response()->json(['message' => 'فایل آپلود شده نادرست است']);

        } catch (ScoreReportTimeExpirationException $exception) {

            return response()->json(['message' => 'مهلت پاسخ یا ارسال گزارش به پایان رسیده است']);

        } catch (ScoreReportAnsweredException $exception) {

            return response()->json(['message' => 'دبیر به گزارش شما پاسخ داده است و امکان ویرایش وجود ندارد']);

        }
    }
}
