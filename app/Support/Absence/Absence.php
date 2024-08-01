<?php

namespace App\Support\Absence;
use App\Repositories\CourseSelectedRepositoryInterface;
use App\Repositories\SessionRepositoryInterface;
use App\Repositories\AbsenceRepositoryInterface;
use App\Support\Session\Session;
use Illuminate\Http\Request;

class Absence
{

    public function __construct(
        readonly CourseSelectedRepositoryInterface $courseSelectedRepository,
        readonly SessionRepositoryInterface        $sessionRepository,
        readonly AbsenceRepositoryInterface        $repository,
    ){}

    public function UpdateOrCreateAbsence()
    {
        return $this->insertAbsence($this->verifyAbsences()->all());
    }

    protected function insertAbsence($data)
    {
        return $this->repository->insert($data);
    }

    protected function getAllSAbsences($ids)
    {
        return $this->courseSelectedRepository->getCourseSelectedByIds($ids);
    }

    public function absences(array $data)
    {
        foreach ($data as $absence) {

            $absences[$absence['id']] = [
                "delay" => $absence['delay'],
                'is_excused_absence' => $absence['is_excused_absence'],
                "reason_absence" => $absence['reason_absence'],
            ];
        }

        return $absences;
    }
    public function refreshAbcenses($sessionId, $absences)
    {
        return $this->sessionRepository
            ->getSession($sessionId)
            ->courseSelectedAbcenses()
            ->sync($this->absences($absences) );
    }
}

