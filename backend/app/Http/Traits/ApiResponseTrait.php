<?php 
namespace App\Http\Traits;

trait ApiResponseTrait {    
    /**
     * retourne un message d'erreur
     *
     * @param  String $message
     * @param  int $statusCode
     * @return \Illuminate\Http\JsonResponse 
     */
    public function sendErrorResponse($message, $statusCode) {
        return response()->json([
            'success' => false,
            'message' => $message,
        ], $statusCode);
    }

    /**
     * retourne un message de succès
     *
     * @param  Array<mixed> $data donnée récupérée
     * @param  String $message
     * @param  int $statusCode
     * @return \Illuminate\Http\JsonResponse 
     */
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
