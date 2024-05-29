<?php

namespace App\Http\Controllers;

use App\Models\Crud;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CrudController extends Controller
{
    public function createCrud(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'required',
            "email" => 'required|email',
            "age" => 'required',
            "phone" => 'required',
            "address" => 'required'
        ]);
        // $crud = Crud::create($data);
        if ($validator->fails()) {
            return response()->json([
                'status' => '422',
                'error' => $validator->errors()

            ]);
        } else {
            $crud = new Crud();
            $crud->name = $request->name;
            $crud->email = $request->email;
            $crud->age = $request->age;
            $crud->phone = $request->phone;
            $crud->address = $request->address;
            $crud->save();
            return response()->json([
                'status' => '200',
                'msg' => "Create User Successfully"
            ]);
        }
    }
    public function showCrud()
    {
        //  // Retrieve all records from the 'Crud' model
        //  $crud = Crud::all();

        //  // Return the data as JSON
        //  return response()->json($crud);
        $crud = Crud::all();
        return response()->json($crud);

    }
    public function editCrud(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            "name" => 'required',
            "email" => 'required|email',
            "age" => 'required',
            "phone" => 'required',
            "address" => 'required'
        ]);
        // $crud = Crud::create($data);
        if ($validator->fails()) {
            return response()->json([
                'status' => '422',
                'error' => $validator->errors()

            ]);
        } else {
            $edit = Crud::find($id);
            $edit->name = $request->name;
            $edit->email = $request->email;
            $edit->age = $request->age;
            $edit->phone = $request->phone;
            $edit->address = $request->address;
            $edit->save();
            return response()->json([
                'status' => '200',
                'msg' => "Edit User Successfully"
            ]);
        }
    }

    public function deleteCrud(string $id)
    {
        $crud = Crud::find($id);
        $crud->delete();
        return response()->json([
            'status' => '200',
            'msg' => "Delete User Successfully"
        ]);
    }
    public function Crud(string $id)
    {
        $crud = Crud::find($id);
        return response()->json([
            'status' => '200',
            'msg' => "Show Single User Successfully",
            'data' => $crud
        ]);
    }
    public function searchCrud(Request $request)
    {
        $query = $request->input('query');

        $search = Crud::where('name', 'LIKE', "%{$query}%")
            ->orWhere('email', 'LIKE', "%{$query}%")
            ->get();

        return response()->json($search);
        // $data = $request->get('data');

        // $search = Crud::where('name', 'like', "%{$data}%")
        //     ->orWhere('email', 'like', "%{$data}%")
        //     ->get();

        // return response()->json([
        //     'data' => $search
        // ]);
    }

}
