<?php
		$type=$_SERVER["QUERY_STRING"];
		//keys
		$key1="b05dcd698e5ca2eab4a0cd1eee4117e7db2a10c4";
		$key2="12c3302e49b9b40ab8a222d7cf79a69ad11ffd78";
		$key3="5b8384087156eb88dce1a1d321c945564f4d858e";
		$key4="a73121520492f88dc3d33daf2103d7574f1a3166";
		//
		//url construction
		$url='http://api.zappos.com/Search?term=';
		$url.=$type;
		$url.='&key=';
		$url.=$key1;
		//
		//get JSON
		$json = file_get_contents($url);
		echo $json;
?>
