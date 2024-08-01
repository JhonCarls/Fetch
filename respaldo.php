<?php

$host = "localhost";
$nombre = "db_aaae42_zzheto";
$usuario = "aaae42_zzheto";
$password = "fabiola9420";

$fecha = date ('Ymd_His');

$nombre_sql =$nombre .'_'.$fecha.'.sql';

$dump ="mysqldump -u$usuario -p$password $nombre > $nombresql";

exec($dump);

$zip = new ZipArchive();

$nombre_zip = $nombre.'_'.$fecha.'.zip';
if($zip->open($nombre_zip, ZipArchive::CREATE)=== true){
    $zip->addFile($nombre_sql);
    $zip->close();
    unlink($nombre_sql);

}

?>