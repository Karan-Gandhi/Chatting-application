export default interface NormalTextFieldProps {
	label: string;
	type: string;
	error?: boolean;
	errorText?: string;
	onChange?: (e: any) => void;
	onSubmit?: (e: any) => void;
}
