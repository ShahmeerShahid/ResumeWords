FROM python:3-onbuild
COPY . /usr/src/app
RUN pip install -r requirements.txt
CMD ["uwsgi", "config.ini"]