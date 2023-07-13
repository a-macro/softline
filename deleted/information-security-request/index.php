<?php
require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/header.php");
$APPLICATION->SetTitle("Запрос по сервисам информационной безопасности");
$img = $APPLICATION->GetDirProperty('background');
if ($img == "" || !$img)
  $img = "/local/templates/softline/assets/images/history/history-1.jpg"
?>

<section class="cookie-page">
  <div class="insights-main-bg">

    <?
    $APPLICATION->IncludeComponent(
      "bitrix:breadcrumb",
      "",
      array(
        "START_FROM" => "0",
        "PATH" => "",
        "SITE_ID" => ""
      )
    ); ?>

    <img src="<?= $img ?>" alt="" />

    <h1><? $APPLICATION->ShowTitle(false); ?></h1>
  </div>

  <div class="crm-block pt10 wrapper">

    <? $APPLICATION->IncludeComponent(
      "bitrix:main.include",
      "",
      array(
        "AREA_FILE_SHOW" => "page",
        "AREA_FILE_SUFFIX" => "inc",
        "EDIT_TEMPLATE" => ""
      )
    ); ?>


  </div>


</section>

<?php require($_SERVER["DOCUMENT_ROOT"] . "/bitrix/footer.php"); ?>