FROM python:3-onbuild
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN pip install -r requirements.txt
CMD ["uwsgi", "config.ini"]