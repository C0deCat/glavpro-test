<?php

namespace backend\controllers;

class RegularController extends \yii\rest\ActiveController
{
    public $modelClass = 'backend\models\Regular';

    public function behaviors()
{
    return [
        'corsFilter' => [
            'class' => \yii\filters\Cors::class,
        ],
        'contentNegotiator' => [
            'class' => \yii\filters\ContentNegotiator::class,
            'formats' => [
                'application/json' => \yii\web\Response::FORMAT_JSON,
            ],
        ]
    ];
}
}
