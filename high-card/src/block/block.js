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
    InspectorControls // New component!
} = wp.blockEditor;


import { Button } from '@wordpress/components';


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
		title: {
			type: 'array',
			source: 'children',
			selector: 'h3',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		description: {
			type: 'array',
			source: 'children',
			selector: '.high-card-description',
		},
		
	},
	example: {
		attributes: {
			title: __( 'Featured', 'high-card' ),
			mediaURL: 'http://placehold.it/1440x700',
			description: [
				__( 'The Process', 'high-card' ),
			],
		
		},
	},
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		const {
			className,
			attributes: { title, mediaID, mediaURL, description },
			setAttributes,
			focus
		} = props;
		const onChangeTitle = ( value ) => {
			setAttributes( { title: value } );
		};

		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		const onChangeDescription = ( value ) => {
			setAttributes( { description: value } );
		};
		return (
		
		<InspectorControls>
			//This text will show when the box is selected
		</InspectorControls>,
		
		<div className={ props.className }>
			<RichText
				tagName="h3"
				placeholder={__('Name of of Featured Product', 'high-card')}
				value={ title }
				onChange={ onChangeTitle }
			/>
				
			<div className="high-card-image">
				<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes="image"
					value={ mediaID }
					render={ ( { open } ) => (
						<Button
							className={
								mediaID
									? 'image-button'
									: 'button button-large'
							}
							onClick={ open }
						>
							{ ! mediaID ? (
								__( 'Upload Image', 'high-card' )
							) : (
								<img
									src={ mediaURL }
									alt={ __(
										'High Card Image',
										'high-card'
									) }
								/>
							) }
						</Button>
					) }
				/>
				
			</div>
				
			<RichText
				tagName="div"
				multiline="p"
				className="high-card-description"
				placeholder={ __(
					'Descriobe image',
					'gutenberg-examples'
				) }
				value={description}
				onChange={ onChangeDescription}
			/>
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
			attributes: { title, mediaURL, description },
		} = props;
		return (
			<div className={ className }>
				<RichText.Content tagName="h3" value={ title } />

				{ mediaURL && (
					<img
						className="high-card-image"
						src={ mediaURL }
						alt={ __( 'High Card Image', 'high-card' ) }
					/>
				) }

				<RichText.Content
					tagName="div"
					className="high-card-description"
					value={ description}
				/>

			</div>
		);
	},
} );
