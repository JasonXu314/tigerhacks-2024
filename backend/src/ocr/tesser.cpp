#include <leptonica/allheaders.h>
#include <tesseract/baseapi.h>

#include <fstream>

using namespace std;

int main(int argc, char** argv) {
	if (argc < 3) return 1;

	char* outText;
	int* confidences;

	tesseract::TessBaseAPI* api = new tesseract::TessBaseAPI();
	// Initialize tesseract-ocr with English, without specifying tessdata path
	if (api->Init(NULL, "eng")) {
		fprintf(stderr, "Could not initialize tesseract.\n");
		exit(1);
	}

	// Open input image with leptonica library
	Pix* image = pixRead(argv[1]);
	api->SetImage(image);
	// Get OCR result
	outText = api->GetUTF8Text();
	confidences = api->AllWordConfidences();

	ofstream out(argv[2]);
	out << "[{\"text\":\"";
	int i = 0, confTotal = 0, wc = 0;
	char* c = outText;
	while (*c != '\0') {
		if (isspace(*c)) {
			confTotal += confidences[i];
			wc++;
			i++;
			char cc = *c;
			while (isspace(*c)) {
				c++;
			}
			c--;

			if (cc == '\n') {
				out << "\",\"confidence\":" << (double)confTotal / wc << "}";
				wc = 0;
				confTotal = 0;

				if (confidences[i] != -1) {
					out << ",{\"text\":\"";
				}
			} else if (cc == '\r') {
				out << "FUCK THIS";
			} else {
				out << cc;
			}
		} else {
			if (*c == '\\') {
				out << "\\\\\\\\";
			} else if (*c == '"') {
				out << "\\\"";
			} else {
				out << *c;
			}
		}

		c++;
	}
	out << "]";
	out.close();

	// Destroy used object and release memory
	api->End();
	delete api;
	delete[] outText;
	delete[] confidences;
	pixDestroy(&image);

	return 0;
}