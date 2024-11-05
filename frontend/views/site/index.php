<?php

/** @var yii\web\View $this */

$this->title = 'My Yii Application';

$style= <<< CSS

   .integrationFrame {
    height: calc(100vh - 156px);
    width: 100%
   }

 CSS;

 $this->registerCss($style);

?>
<div class="site-index">
    <div class="body-content">

        <iframe class="integrationFrame" src="http://localhost:5173/"></iframe>

    </div>
</div>
