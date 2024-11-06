<?php

namespace backend\models;

use Yii;

/**
 * This is the model class for table "regulars".
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $code_phrase
 * @property string|null $phone
 * @property int|null $score
 */
class Regular extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'regulars';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['score'], 'integer'],
            [['name', 'code_phrase', 'phone'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'code_phrase' => 'Code Phrase',
            'phone' => 'Phone',
            'score' => 'Score',
        ];
    }
}
