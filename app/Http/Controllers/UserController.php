<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): View
    {
        // Filtros
        $search = $request->input('search');
        $adminFilter = $request->input('admin_filter');

        $usersQuery = User::query();

        if ($search) {
            $usersQuery->where('name', 'like', '%' . $search . '%');
        }
        if ($adminFilter !== null) {
            $usersQuery->where('admin', $adminFilter);
        }

        $users = $usersQuery->paginate();

        return view('user.index', compact('users', 'search', 'adminFilter'))
            ->with('i', ($request->input('page', 1) - 1) * $users->perPage());
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(): View
    {
        $user = new User();

        return view('user.create', compact('user'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['admin'] = $data['admin'] ?? 0;

        User::create($data);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show($id): View
    {
        $user = User::find($id);

        return view('user.show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id): View
    {
        $user = User::find($id);

        return view('user.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, User $user): RedirectResponse
    {

        $data = $request->validated();


        $data['admin'] = $data['admin'] ?? 0;


        $user->update($data);


        return Redirect::route('users.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): RedirectResponse
    {
        User::find($id)->delete();

        return Redirect::route('users.index')
            ->with('success', 'User deleted successfully');
    }
}
