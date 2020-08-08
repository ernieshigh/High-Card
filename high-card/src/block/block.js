/**
 * BLOCK: high-card
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const {
    RichText,
	MediaUpload,
    AlignmentToolbar,
    BlockControls,
    BlockAlignmentToolbar,
    InspectorControls,
    PanelColorSettings,
    ColorPalette,
	InnerBlocks,
} = wp.blockEditor;


const { 
	Toolbar,
    Button,
    Tooltip,
	CheckboxControl, 
	SelectControl,
	PanelBody,
    PanelRow,
} = wp.components;

const { Component, Fragment } = wp.element;





/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
 
registerBlockType( 'high-card/block-high-card', { 
	title: __( 'SidexSide Card' ), // Block title.
	icon: 'id', 
	category: 'common', 
	keywords: [
		__( 'card' ),
		__( 'side by side' ),
		__( 'image' ),
	],

	// attributes the html elements in block 
	attributes: {
		highBackground: {
			type: 'string',
			default: '#f6f6f6' // is optional
		},
		
		fontColor: {
			type: 'string',
			default: '#f00' // is optional
		},
	},
	
	supports: {
		align: true
	},
	
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	*/
	edit: ( props ) => {
		const {
			className,
			attributes: { fontColor, highBackground },
			setAttributes,
		} = props;
		
		function onChangeBackgroundColor( newBackground ) {
			setAttributes( { highBackground: newBackground } );
		}
		
		
		function onChangeFontColor( newColor) {
			setAttributes( { fontColor: newColor } );
		}
		
		const HIGH_CARD_TEMPLATE = [
			[ 'core/columns', { columns: 2 }, [
				[ 'core/column', {}, [
					[ 'core/image']
				] ],
				
				[ 'core/column', {}, [
					['core/heading', {placeholder: 'Enter title ...', className: 'is-head',style:{color:fontColor}}],
					[ 'core/paragraph', { placeholder: 'Enter heading...', className: 'is-style-custom-style', style:{color:fontColor}} ]
				] ],
            
			]]
		];
		
			 
		return ( 
		
			<div className={ props.className } style={{backgroundColor: highBackground}}> 
				<InspectorControls>
					<PanelBody>
						<PanelColorSettings
							title={ __( 'Color Settings' ) }
							colorValue={ highBackground }
							initialOpen={true}
							colorSettings={ [ {
								value: highBackground,
								onChange: onChangeBackgroundColor,
								label: __( 'Choose a background color' ),
							},
							{
								value: fontColor,
								onChange: onChangeFontColor,
								label: __( 'Choose text color' ),
							}							
						] }
						></PanelColorSettings>
					</PanelBody>
				</InspectorControls>
		
			
			<InnerBlocks template={HIGH_CARD_TEMPLATE} templateLock='all'/>
			
			</div>
			
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const {
			className,
			attributes: { title, mediaURL, description, fontColor, highBackground},
		} = props;
		return (
			
			<div className={ className } style={{backgroundColor: props.attributes.highBackground}}>
			
				<InnerBlocks.Content />

			</div>
		);
	},
} );
