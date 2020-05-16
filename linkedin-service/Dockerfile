FROM python:3-onbuild
COPY . /usr/app/src
# WORKDIR /user/app/src
RUN pip install -r requirements.txt


CMD ["uwsgi", "config.ini"]
