import { useState } from "react";
import styled from "styled-components";

const Filter = () => (
	<FilterWrapper>
		<FilterButton />
		<FilterInput />
    <FilterPopUp />
	</FilterWrapper>
);

const FilterButton = () => (
	<ButtonWrapper>
		<ButtonText>필터</ButtonText>
		<ArrowIcon />
	</ButtonWrapper>
);

const ArrowIcon = () => (
	<ArrowWrapper>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M4 6L8 10L12 6" stroke="#6E7191" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	</ArrowWrapper>
);

const FilterInput = () => {
	const [input, setInput] = useState("is:issue is:open");

	return (
		<InputWrapper>
			<GlassIcon />
			<InputText>{input}</InputText>
		</InputWrapper>
	);
};

const GlassIcon = () => (
	<GlassWrapper>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
				stroke="#A0A3BD"
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path d="M14 14L11.1 11.1" stroke="#A0A3BD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</GlassWrapper>
);

const FilterPopUp = () => {
	return <PopUpWrapper></PopUpWrapper>;
};

const FilterWrapper = styled.div`
	position: absolute;
	width: 601px;
	height: 40px;
	border: 1px solid #d9dbe9;
	border-radius: 11px;
`;
const ButtonWrapper = styled.div`
	position: absolute;
	width: 128px;
	height: 40px;
	left: 0px;
	top: 0px;
	background: #f7f7fc;
	border-radius: 11px 0px 0px 11px;
`;
const ButtonText = styled.div`
	position: absolute;
	width: 56px;
	height: 28px;
	left: 24px;
	top: 6px;
	font-weight: bold;
	font-size: 16px;
	line-height: 28px;
	color: #6e7191;
`;
const ArrowWrapper = styled.div`
	position: absolute;
	left: 88px;
	top: 12px;
`;
const InputWrapper = styled.div`
	position: absolute;
	width: 473px;
	height: 40px;
	left: 128px;
	top: 0px;
	background: #eff0f6;
	border-radius: 0px 11px 11px 0px;
`;
const InputText = styled.div`
	position: absolute;
	width: 400px;
	height: 28px;
	left: 48px;
	top: 6px;
	font-size: 16px;
	line-height: 28px;
	color: #a0a3bd;
`;
const GlassWrapper = styled.div`
	position: absolute;
	left: 24px;
	top: 12px;
`;
const PopUpWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	position: absolute;
	width: 240px;
	height: 273px;
	left: 0px;
	top: 48px;
	background: #d9dbe9;

	border: 1px solid #d9dbe9;
	border-radius: 16px;
`;

export default Filter;
