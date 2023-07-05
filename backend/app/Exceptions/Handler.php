<?php

namespace App\Exceptions;

use App\Http\Traits\ApiResponseTrait;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Throwable;

class Handler extends ExceptionHandler
{
    use ApiResponseTrait;
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    // ici la fonction render change le comportement par défaut 
    // en retournant des réponses http personnalisée lorsqu'une erreur se produit 

    public function render($request, Throwable  $exception)
    {
        

        if ($request->is('api/*')) {
            // cette erreur se produit lorsque la méthode findOrfail ne retourne pas
            // une instance du model 
            if ($exception instanceof ModelNotFoundException) {
                return $this->sendErrorResponse('La clé demandée est introuvable',404);
            // cette erreur se produit lorsque la validation échoue
            }else if ($exception instanceof ValidationException) {
                return $this->sendErrorResponse($exception->getMessage(),422);
            }else if ($exception instanceof QueryException) {
                return $this->sendErrorResponse($exception->getMessage(),500);
            }  

        // retour d'erreur par défaut
        return parent::render($request, $exception);

    }}
}
