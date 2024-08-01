<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile;
use App\Http\Resources\ProfileResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        // Return the user's profile information
        $user = auth()->user();
        return response()->json(new ProfileResource($user));
    }

    public function update(Profile $request)
    {
        // Update the user's profile information
        $user = auth()->user();

        $user->update([
            'password' => Hash::make($request->get('password')),
        ]);

        return response()->json(['message' => 'Profile updated successfully']);
    }
}
