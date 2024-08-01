<?php

namespace App\Imports;

<?php

namespace App\Imports;

use App\Events\RowsNotification;
use App\Interfaces\RowsRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;
use Maatwebsite\Excel\Concerns\WithUpserts;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\RemembersRowNumber;
use Maatwebsite\Excel\Concerns\SkipsEmptyRows;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Validators\Failure;
use PhpOffice\PhpSpreadsheet\Shared\Date;

class RowsImport implements ToCollection, WithUpserts, WithHeadingRow, WithValidation, WithCalculatedFormulas,
    SkipsOnFailure, SkipsEmptyRows
{
    use RemembersRowNumber;

    private int $endRow;
    private int $totalRows;
    private RowsRepositoryInterface $rowsRepository;

    public function __construct(
        public int $startRow,
        public int $rowsToImport = 1000
    ) {
        $this->endRow = $startRow + $rowsToImport;

        $this->rowsRepository = App::make(RowsRepositoryInterface::class);
    }

    public function lastRowProccessed(): bool
    {
        return $this->endRow >= $this->totalRows;
    }

    public function collection(Collection $rows)
    {
        $this->totalRows = $rows->count();

        $rowsToSave = $rows->slice($this->startRow, $this->rowsToImport)
            ->map(function ($row) {
                $row['date'] = Date::excelToDateTimeObject($row['date'])->format('Y-m-d');
                return $row;
            })
            ->toArray();

        $this->rowsRepository->save($rowsToSave);

        event(new RowsNotification("persisted rows: " . count($rowsToSave)));
    }

    /**
     * @return string|array
     */
    public function uniqueBy()
    {
        return 'id';
    }

    public function rules(): array
    {
        return [
            'id' => 'required|integer|min:1',
            'name' => 'required',
            'date' => 'required|integer|min:0|max:99999'
        ];
    }

    /**
     * @param Failure[] $failures
     */
    public function onFailure(Failure ...$failures)
    {
        //
    }
}
