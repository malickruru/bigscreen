<?php

namespace App\Http\Controllers;

use App\Http\Traits\ApiResponseTrait;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use ApiResponseTrait;
    /**
     * Inscrire l'administrateur
     * 
     * @param
     * email 
     * password
     */
    public function login(Request $request)
    {
        if(!Auth::attempt($request->only(['email', 'password']))){
            return $this->sendErrorResponse('accès incorrect',401);
        } else{
            $user = User::where('email', $request->email)->first();
            if ($user->role_id != 1){
                return $this->sendErrorResponse('vous n\'êtes pas adminstrateur , accès refusé',401);
            }else{
                return $this->sendSuccessResponse(['token' => $user->createToken('API')->plainTextToken],'Connexion réussit');
            }
        }
    }

    

    /**
     * Déconnexion
     * 
     * @param
     * email 
     */
    public function logout(Request $request)
    {
        User::where('email', $request->email)->first()->tokens()->delete();
        return $this->sendSuccessResponse([],'Déconnexion réussit');
    }
}
