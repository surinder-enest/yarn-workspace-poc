import { shallow, render, mount, configure } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import toJson from 'enzyme-to-json';

// React 16 Enzyme adapter
configure({ adapter: new Adapter() });

// Make Enzyme functions available in all test files without importing
(global as any).shallow = shallow;
(global as any).render = render;
(global as any).mount = mount;
(global as any).toJson = toJson;
(global as any).console = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
(global as any).MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

// Fail tests on any warning
console.error = (message: string) => {
  throw new Error(message);
};

// Mocking localStorage
const localStorageMock = (function () {
  let store: { [name: string]: any } = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };

})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

HTMLCanvasElement.prototype.getContext = jest.fn();
