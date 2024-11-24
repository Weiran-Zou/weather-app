import MyText from "../components/UIElements/MyText";
import { render, screen } from '@testing-library/react-native';

describe('MyText component', () => {
  it('should render title text component', () => {
      render(<MyText title>title</MyText>);
      expect(screen.getAllByRole('text', { name: 'title', title: true }))
  })

  it('should render default text component', () => {
    render(<MyText>title</MyText>);
    expect(screen.getAllByRole('text', { name: 'title', title: false }))
  })
    
})