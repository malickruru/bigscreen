<?php 
namespace App\Http\Traits;

trait ApiResponseTrait {
    public function sendErrorResponse($message, $statusCode) {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], $statusCode);
    }

    public function sendSuccessResponse($data, $message = '', $statusCode = 200) {
        $response = [
            'success' => true,
            'data' => $data,
        ];

        if (!empty($message)) {
            $response['message'] = $message;
        }

        return response()->json($response, $statusCode);
    }
}
