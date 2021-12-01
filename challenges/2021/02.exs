Code.compile_file(Path.join([__ENV__.file], ["../../../utils/utils.exs"]))

defmodule Challenge do
  @moduledoc false

  def input do
    Utils.load_input(__ENV__.file)
  end

  def first_result(input) do
    input
  end

  def second_result(input) do
    input
  end
end

Utils.run(&Challenge.first_result/1, __ENV__.file, "Q1")
Utils.run(&Challenge.second_result/1, __ENV__.file, "Q2")
