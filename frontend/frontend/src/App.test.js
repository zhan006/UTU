import { render, screen } from '@testing-library/react';
import App,{differenceBetween} from './App';

describe("App",()=>{
  test("differenceBetween",()=>{
      expect(differenceBetween(2.3,5)).toBe(-54.0)
      expect(differenceBetween(7,5)).toBe(40.0)
  })
  test("App render",async ()=>{
      render(<App/>);
      //test table header
      await screen.findByText(/Coin/).toBeInTheDocument();
      //test table cell
      await screen.findByText(/bitcoin/).toBeInTheDocument();
  })
  }
)