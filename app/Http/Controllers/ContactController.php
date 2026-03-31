<?php

namespace App\Http\Controllers;

use App\DTOs\ContactData;
use App\Mail\ContactMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name'  => 'required',
            'email' => ['email', 'required'],
            'body'  => 'required',
        ]);

        $contact = ContactData::fromRequest($validated);

        Mail::to('mcorchoperez@gmail.com')
            ->send(new ContactMail($contact));

        return ['success' => true];
    }
}
