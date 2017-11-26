<?php
/**
 * Put specified scripts altogether
 *
 * @param [array-associative] $options
 *  	[
 *			'directory' => [string] $filesDirectory, 
 *			'type' => [string] $fileType ('js','css'),
 *			'name' => [arrayOfString] $fileName
 *		];
 *
 * @return [string] Blended scripts in <script> or <style>
 */
function scriptsBlender( $options = [] ) {
	$default = [
		'directory' => '',
		'type' => 'js',
		'name' => null
	];

	// Merge user's options to default options
	$options =  array_merge( $default, $options );

	$tag = ( $options['type'] === 'js' ? 'script>' : 'style>' );
	$blended = '<' . $tag;

	// If name is not specified, get all files in the directory
	if ( is_null($options['name']) ) {
		foreach ( glob( $options['directory'] . '/*.' . $options['type'] ) as $script ) {
			$blended .= file_get_contents($script);
		}
	} else {
		foreach ( $options['name'] as $name ) {
			$blended .= file_get_contents( $options['directory'] . '/' . $name . '.' . $options['type'] );
		}
	}

	echo $blended . '</' . $tag;
}
?>
