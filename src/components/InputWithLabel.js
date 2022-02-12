import styled from "styled-components";

const InputWithLabel = ({
  id,
  label,
  value,
  onInputChange,
  type = "text",
  children,
}) => {
  return (
    <>
      <StyledLabel htmlFor={id}>{children}</StyledLabel>
      &nbsp;
      <StyledInput id={id} type={type} value={value} onChange={onInputChange} />
    </>
  );
};

const StyledLabel = styled.label`
  border-top: 1px solid #171212;
  border-left: 1px solid #171212;
  padding-left: 5px;
  font-size: 24px;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #171212;
  background-color: transparent;

  font-size: 24px;
`;

export default InputWithLabel;
