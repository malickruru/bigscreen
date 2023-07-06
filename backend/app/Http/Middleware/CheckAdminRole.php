<?php

namespace App\Http\Middleware;

use App\Http\Traits\ApiResponseTrait;
use Closure;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

use Laravel\Sanctum\PersonalAccessToken;


class CheckAdminRole
{
    use ApiResponseTrait;
    public function handle(Request $request, Closure $next)
    {
        // extraire le token de l'entête de la requête
        $header = $request->header('Authorization');
        $token = $this->extractTokenFromHeader($header);
        
        if ($token) {
            // récupérer l'instance du token 
            $personalAccessToken =  PersonalAccessToken::findToken($token);
            
            // récupérer l'utilisateur lié à ce token
            $user = $personalAccessToken->tokenable;
            
            // vérifier le role
            if ($user->role_id == 1) {
                return $next($request);
            }
        }

        return $this->sendErrorResponse('Accès refusé. Vous devez être un administrateur.',403);
    }

    private function extractTokenFromHeader($header)
    {
        if (Str::startsWith($header, 'Bearer ')) {
            return Str::substr($header, 7);
        }

        return null;
    }
}
