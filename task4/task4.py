import sys
from os import listdir
from os.path import isfile, join

from PIL import Image


def main():
    directory = sys.argv[1]
    file_names = [f for f in listdir(directory) if isfile(join(directory, f))]
    for file_name in file_names:
        image = Image.open(directory + '/' + file_name)
        dpi = ', dpi: ' + str(image.info['dpi']) if 'dpi' in image.info else ''
        compression = ', compression: ' + str(image.info['compression']) if 'compression' in image.info else ''
        print('Image file ' + file_name + \
            ': size: ' + str(image.size) + dpi + compression)


if __name__ == '__main__':
    main()
