<?php

namespace App\Support\Auth;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class Authentication {

    protected $user;
    protected $request;

    public function __construct(Request $request) 
    {
        $this->request = $request;
    }

    public function authenticate(Authenticatable $user)
    {
        $this->deleteToken($user);

        return (! $user || ! Hash::check($this->request->password, $user->password)) 
                ? response()->json(['error' => 'Unauthorized'], 401) 
                : $this->generateToken($user);
    }

    protected function generateToken($user)
    {
        return [
            'token' => $user->createToken('main_token')->plainTextToken
        ];
    }

    protected function deleteToken($user)
    {
        return $user->tokens('main_token')->delete();
    }

    public function logout()
    {
        $this->deleteToken($this->request->user());
        return response()->json([], 204);
    }
}