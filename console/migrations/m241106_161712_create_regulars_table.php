<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%regulars}}`.
 */
class m241106_161712_create_regulars_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%regulars}}', [
            'id' => $this->primaryKey(),
            'name' => $this->string(),
            'code_phrase' => $this->string(),
            'phone' => $this->string(),
            'score' => $this->integer()
        ]);
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%regulars}}');
    }
}
