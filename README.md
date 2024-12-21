# use-scan-barcode-detection

A React hook for detecting barcode scanner inputs. This hook helps in detecting barcode or QR scanner inputs in your React applications by listening for key events and evaluating scan data.

## Installation

To install `use-scan-barcode-detection`, run the following command:

```bash
npm install use-scan-barcode-detection
```

Or if you're using Yarn:

```bash
yarn add use-scan-barcode-detection
```

## Usage

You can use the `use-scan-barcode-detection` hook to detect barcode scanner inputs. Here is an example of how to use it:

```tsx
import React, { useState } from "react";
import useScanDetection from "use-scan-barcode-detection";

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");

  const handleScanComplete = (code: string) => {
    setBarcode(code);
  };

  const handleScanError = (error: string) => {
    console.error("Scan error:", error);
  };

  useScanDetection({
    onComplete: handleScanComplete,
    onError: handleScanError,
    minLength: 5, // Optional: minimum length of the scanned barcode
  });

  return (
    <div>
      <h1>Scanned Barcode: {barcode}</h1>
    </div>
  );
};

export default BarcodeScanner;
```

### Parameters:

- `timeToEvaluate`: (Optional) Time in milliseconds to wait after the last character before triggering an evaluation of the input. Default is `100ms`.
- `averageWaitTime`: (Optional) Average time between characters in milliseconds. Used to distinguish between keyboard input and scanner input. Default is `50ms`.
- `startCharacter`: (Optional) Character that barcode scanner prefixes input with. Default is an empty array (`[]`).
- `endCharacter`: (Optional) Character that barcode scanner suffixes input with. Default is `[13, 27]` (Enter and Escape keys).
- `onComplete`: Callback function to be called when a valid barcode is detected.
- `onError`: Callback function to be called if an error occurs while scanning (optional).
- `minLength`: (Optional) Minimum length for a valid barcode. Default is `1`.
- `ignoreIfFocusOn`: (Optional) Ignore scan input if the specified node is focused.
- `stopPropagation`: (Optional) Whether to stop event propagation on keydown. Default is `false`.
- `preventDefault`: (Optional) Whether to prevent default behavior on keydown. Default is `false`.
- `container`: (Optional) The container element to attach the keydown event listener to. Default is `document`.

## Example

Below is a simple example of using the hook in a React component:

```tsx
import React, { useState } from "react";
import useScanDetection from "use-scan-barcode-detection";

const ScanComponent = () => {
  const [scannedCode, setScannedCode] = useState("");

  const onScanComplete = (code: string) => {
    setScannedCode(code);
  };

  useScanDetection({
    onComplete: onScanComplete,
    minLength: 5,
  });

  return (
    <div>
      <h1>Scanned Barcode: {scannedCode}</h1>
    </div>
  );
};

export default ScanComponent;
```

## Development

To develop and test the package locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Husain7809/use-scan-barcode-detection.git
   cd use-scan-barcode-detection
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the package:

   ```bash
   npm run build
   ```

4. Run the tests (if applicable).

## Contributing

If you want to contribute to this package, feel free to fork the repository and create a pull request. Here's a simple guide to contributing:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push your branch (`git push origin feature-branch`).
6. Create a pull request.

Please make sure your code follows the existing coding style and is well-tested.

## License

This package is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

This package is maintained by [Mohammadhusain](https://github.com/Husain7809).
