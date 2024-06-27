{% if condition1 %}
  <div>
  Content 1
  </div>
  {% if condition2 %}
    <div>
    Content 2
    </div>
    {% if condition3 %}
      <div>
      Content 3
      </div>
    {% elseif condition4 %}
      <div>
      Content 4
      </div>
    {% else %}
      <div>
      Content 5
      </div>
    {% endif %}
  {% elseif condition5 %}
    <div>
    Content 6
    </div>
    {% if condition6 %}
      <div>
      Content 7
      </div>
    {% else %}
      <div>
      Content 8
      </div>
    {% endif %}
  {% else %}
    <div>
    Content 9
    </div>
  {% endif %}
{% elseif condition7 %}
  <div>
  Content 10
  </div>
  {% if condition8 %}
    <div>
    Content 11
    </div>
    {% if condition9 %}
      <div>
      Content 12
      </div>
    {% else %}
      <div>
      Content 13
      </div>
    {% endif %}
  {% else %}
    <div>
    Content 14
    </div>
  {% endif %}
{% else %}
  <div>
  Content 15
  </div>
{% endif %}
