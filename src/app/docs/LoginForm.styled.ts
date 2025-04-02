import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const StyledAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const StyledAvatar = styled.div`
  width: 80px;
  height: 80px;
  background: #ccc;
  border-radius: 50%;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  &:focus {
    outline: none;
    border-color: #007BFF;
  }
`;

export const StyledShowPasswordButton = styled.button`
  background: transparent;
  border: none;
  color: #007BFF;
  cursor: pointer;
  margin-top: 0.5rem;
`;

export const StyledError = styled.div`
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const StyledRememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledCheckbox = styled.input`
  margin-right: 0.5rem;
`;

export const StyledForgotPasswordLink = styled.a`
  color: #007BFF;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledButton = styled.button`
  background: #007BFF;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;
